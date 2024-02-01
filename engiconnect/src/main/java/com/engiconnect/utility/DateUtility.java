package com.engiconnect.utility;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.stereotype.Component;

/**
 * Utility class to handle date-related operations.
 * 
 * @author Denis
 */
@Component
public class DateUtility {

	/**
	 * Retrieves the current UTC timestamp.
	 */
	public static Timestamp getCurrentUTCTimestamp() {
		return Timestamp.valueOf(LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC));
	}
}
