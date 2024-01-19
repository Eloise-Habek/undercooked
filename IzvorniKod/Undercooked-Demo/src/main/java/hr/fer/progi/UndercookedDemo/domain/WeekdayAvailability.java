package hr.fer.progi.UndercookedDemo.domain;

import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Embeddable
public class WeekdayAvailability {
	@Embedded
	private HourRange monday;
	@Embedded
	private HourRange tuesday;
	@Embedded
	private HourRange wednesday;
	@Embedded
	private HourRange thursday;
	@Embedded
	private HourRange friday;
	@Embedded
	private HourRange saturday;
	@Embedded
	private HourRange sunday;

	public WeekdayAvailability() {
	}

	public HourRange getMonday() {
		return monday;
	}

	public void setMonday(HourRange monday) {
		this.monday = monday;
	}

	public HourRange getTuesday() {
		return tuesday;
	}

	public void setTuesday(HourRange tuesday) {
		this.tuesday = tuesday;
	}

	public HourRange getWednesday() {
		return wednesday;
	}

	public void setWednesday(HourRange wednesday) {
		this.wednesday = wednesday;
	}

	public HourRange getThursday() {
		return thursday;
	}

	public void setThursday(HourRange thursday) {
		this.thursday = thursday;
	}

	public HourRange getFriday() {
		return friday;
	}

	public void setFriday(HourRange friday) {
		this.friday = friday;
	}

	public HourRange getSaturday() {
		return saturday;
	}

	public void setSaturday(HourRange saturday) {
		this.saturday = saturday;
	}

	public HourRange getSunday() {
		return sunday;
	}

	public void setSunday(HourRange sunday) {
		this.sunday = sunday;
	}

	public HourRange get(DayOfWeek dayOfWeek) {
		switch (dayOfWeek) {
			case MONDAY -> {
				return getMonday();
			}
			case TUESDAY -> {
				return getTuesday();
			}
			case WEDNESDAY -> {
				return getWednesday();
			}
			case THURSDAY -> {
				return getThursday();
			}
			case FRIDAY -> {
				return getFriday();
			}
			case SATURDAY -> {
				return getSaturday();
			}
			case SUNDAY -> {
				return getSunday();
			}
			default -> throw new IllegalArgumentException("dayOfWeek out of range in `get`");
		}
	}

	public void set(DayOfWeek dayOfWeek, HourRange hourRange) {
		switch (dayOfWeek) {
			case MONDAY -> setMonday(hourRange);
			case TUESDAY -> setTuesday(hourRange);
			case WEDNESDAY -> setWednesday(hourRange);
			case THURSDAY -> setThursday(hourRange);
			case FRIDAY -> setFriday(hourRange);
			case SATURDAY -> setSaturday(hourRange);
			case SUNDAY -> setSunday(hourRange);
			default -> throw new IllegalArgumentException("dayOfWeek out of range in `set`");
		}
	}

	private static final ZoneId tz = ZoneId.of("Europe/Zagreb");

	@Transient
	public boolean isAvailable() {
		var now = ZonedDateTime.now(tz);
		return isCurrent(now);
	}

	public boolean isCurrent(ZonedDateTime dateTime) {
		var today = dateTime.getDayOfWeek();
		var yesterday = today.minus(1);

		var todayRange = get(today);
		var yesterdayRange = get(yesterday);

		if (todayRange != null && todayRange.isCurrentToday(dateTime)) {
			return true;
		}

		// since yesterday's range can overflow into the following day, check if it's current "tomorrow".
		if (yesterdayRange != null && yesterdayRange.isCurrentTomorrow(dateTime)) {
			return true;
		}

		return false;
	}
}
