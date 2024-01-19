package hr.fer.progi.UndercookedDemo;

import hr.fer.progi.UndercookedDemo.domain.HourRange;
import hr.fer.progi.UndercookedDemo.domain.WeekdayAvailability;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.time.DayOfWeek;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

public class WeekdayAvailabilityTest {

	private WeekdayAvailability availability;

	private static final List<ZonedDateTime> allDts = new ArrayList<>(24 * 7);

	static {
		for (var dow : DayOfWeek.values()) {
			for (var hour = 0; hour < 24; hour++) {
				allDts.add(dt(dow, hour));
			}
		}
	}

	@BeforeEach

	public void beforeEach() {
		availability = new WeekdayAvailability();
	}

	private static HourRange range(int start, int end) {
		var range = new HourRange();
		range.setStart((byte) start);
		range.setEnd((byte) end);
		return range;
	}

	private static ZonedDateTime dt(DayOfWeek dayOfWeek, int hour) {
		var monday = ZonedDateTime.of(2024, 1, 15, hour, 0, 0, 0, ZoneId.systemDefault());
		var deltaDays = dayOfWeek.getValue() - DayOfWeek.MONDAY.getValue();
		return monday.plusDays(deltaDays);
	}

	@Test
	public void testDt() {
		for (var dow : DayOfWeek.values()) {
			assertEquals(dow, dt(dow, 0).getDayOfWeek());
			assertEquals(dow, dt(dow, 23).getDayOfWeek());
		}
	}

	public static Stream<Arguments> test247() {
		return allDts.stream().map(Arguments::arguments);
	}

	@ParameterizedTest
	@MethodSource
	public void test247(ZonedDateTime dt) {
		for (var dow : DayOfWeek.values()) {
			availability.set(dow, range(0, 24));
		}

		assertTrue(availability.isCurrent(dt));
	}

	@Test
	public void testPastMidnight()
	{
		availability.set(DayOfWeek.MONDAY, range(7, 2));
		availability.set(DayOfWeek.TUESDAY, range(7, 20));

		assertTrue(availability.isCurrent(dt(DayOfWeek.MONDAY, 22)));
		assertTrue(availability.isCurrent(dt(DayOfWeek.TUESDAY, 1)));
		assertFalse(availability.isCurrent(dt(DayOfWeek.TUESDAY, 3)));
		assertTrue(availability.isCurrent(dt(DayOfWeek.TUESDAY, 8)));
	}
}
