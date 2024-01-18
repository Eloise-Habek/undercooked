package hr.fer.progi.UndercookedDemo;

import hr.fer.progi.UndercookedDemo.domain.HourRange;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.params.provider.Arguments.arguments;

public class HourRangeTest {

	private HourRange hourRange;

	private static final List<ZonedDateTime> allTimes = new ArrayList<>(24 * 60);

	public HourRangeTest() {
		for (int h = 0; h < 24; h++) {
			for (int m = 0; m < 60; m++) {
				allTimes.add(time(h, m));
			}
		}
	}

	@BeforeEach
	public void beforeEach() {
		hourRange = new HourRange();
	}

	private static ZonedDateTime time(int hour, int minute) {
		return ZonedDateTime.of(2024, 1, 17, hour, minute, 0, 0, ZoneId.systemDefault());
	}

	private static Stream<Arguments> test() {
		return Stream.of(
				arguments(7, 20, time(3, 0), Expected.None),
				arguments(7, 20, time(7, 0), Expected.Today),
				arguments(7, 20, time(7, 30), Expected.Today),
				arguments(7, 20, time(19, 30), Expected.Today),
				arguments(7, 20, time(20, 30), Expected.None),
				arguments(7, 20, time(20, 0), Expected.None),
				arguments(7, 20, time(23, 59), Expected.None),
				arguments(18, 4, time(17, 59), Expected.None),
				arguments(18, 4, time(18, 0), Expected.Today),
				arguments(18, 4, time(23, 59), Expected.Today),
				arguments(18, 4, time(0, 0), Expected.Tomorrow),
				arguments(18, 4, time(3, 30), Expected.Tomorrow),
				arguments(18, 4, time(3, 59), Expected.Tomorrow),
				arguments(18, 4, time(4, 0), Expected.None),
				arguments(18, 4, time(7, 30), Expected.None)
		);
	}

	@ParameterizedTest
	@MethodSource
	public void test(int start, int end, ZonedDateTime testedTime, Expected expected) {
		hourRange.setStart((byte) start);
		hourRange.setEnd((byte) end);
		Assertions.assertEquals(expected == Expected.Today, hourRange.isCurrentToday(testedTime));
		Assertions.assertEquals(expected == Expected.Tomorrow, hourRange.isCurrentTomorrow(testedTime));
	}

	@Test
	public void test24HourAlwaysCurrentToday() {
		hourRange.setStart((byte) 0);
		hourRange.setEnd((byte) 24);

		for (var time : allTimes) {
			Assertions.assertTrue(hourRange.isCurrentToday(time));
			Assertions.assertFalse(hourRange.isCurrentTomorrow(time));
		}
	}

	@Test
	public void testZeroRangeNeverCurrent() {
		for (byte range = 0; range <= 24; range++) {
			hourRange.setStart(range);
			hourRange.setEnd(range);

			for (var time : allTimes) {
				Assertions.assertFalse(hourRange.isCurrentToday(time));
				Assertions.assertFalse(hourRange.isCurrentTomorrow(time));
			}
		}
	}

	@Test
	public void test0And24Equivalent() {
		var range0 = new HourRange();
		var range24 = new HourRange();
		range0.setEnd((byte) 0);
		range24.setEnd((byte) 24);

		// equivalent, but not for 0-24 and 24-24
		for (byte start = 1; start < 24; start++) {
			range0.setStart(start);
			range24.setStart(start);

			for (var time : allTimes) {
				Assertions.assertEquals(range0.isCurrentToday(time), range24.isCurrentToday(time));
				Assertions.assertEquals(range0.isCurrentTomorrow(time), range24.isCurrentTomorrow(time));
			}
		}
	}

	public enum Expected {
		None,
		Today,
		Tomorrow
	}
}
