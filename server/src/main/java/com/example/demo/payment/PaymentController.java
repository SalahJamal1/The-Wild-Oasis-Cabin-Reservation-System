package com.example.demo.payment;

import com.example.demo.bookings.Booking;
import com.example.demo.bookings.BookingService;
import com.example.demo.cabins.CabinService;
import com.example.demo.user.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final CabinService cabinService;
    private final BookingService bookingService;

    @Value("${STRIP_SECRET.KEY}")
    private String stripSecretKey;

    @PostMapping("/create-session")
    public ResponseEntity<?> CreateSession(@RequestBody Booking newBooking, @AuthenticationPrincipal User user, @RequestParam("cabinId") Integer cabinId) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You need to be logged in");
        }
        var cabin = cabinService.findById(cabinId);
        Booking booking = null;
        try {

            newBooking.setUser(user);
            newBooking.setCabin(cabin);
            newBooking.setPaid(false);
            String YOUR_DOMAIN = "http://localhost:3000";
            booking = bookingService.save(newBooking);
            Stripe.apiKey = stripSecretKey;
            SessionCreateParams params =
                    SessionCreateParams.builder()
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .setSuccessUrl(YOUR_DOMAIN + "/account/reservations?success=true")
                            .setCancelUrl(YOUR_DOMAIN + "?canceled=true")
                            .setClientReferenceId(booking.getId().toString())
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setQuantity(1L)
                                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                    .setUnitAmount((booking.getTotalPrice() * 100))
                                                    .setCurrency("usd")
                                                    .setProductData(SessionCreateParams
                                                            .LineItem
                                                            .PriceData
                                                            .ProductData
                                                            .builder()
                                                            .setName("#Cabin " + cabinId)
                                                            .addImage(cabin.getImage())
                                                            .build())
                                                    .build())
                                            .build())
                            .build();

            Session session = Session.create(params);
            Map<String, Object> response = Map.of("url", session.getUrl());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            if (booking != null) {
                bookingService.delete(booking.getId());
            }
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Transactional
    @PostMapping("/webhook")
    public void webhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) throws JsonProcessingException {
        String endpointSecret = "whsec_5ecfe91087bc84908f4109a771adf8dc37c9b87812973add260bf7aafed37e45";
        Event event = null;
        Integer bookingId = null;
        ObjectMapper mapper = new ObjectMapper();
        JsonNode payloadNode = mapper.readTree(payload).path("data")
                .path("object");


        try {
            event = Webhook.constructEvent(
                    payload, sigHeader, endpointSecret
            );

            if ("checkout.session.completed".equals(event.getType())) {
                if (payloadNode.has("client_reference_id")) {
                    bookingId = payloadNode.path("client_reference_id").asInt();
                    Booking booking = bookingService.findById(bookingId);
                    booking.setPaid(true);
                    bookingService.save(booking);
                }

            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong");

        }

    }
}
