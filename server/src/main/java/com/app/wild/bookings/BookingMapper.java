package com.app.wild.bookings;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public class BookingMapper {
    void updateBooking(Booking source, @MappingTarget Booking target) {
    }
}
