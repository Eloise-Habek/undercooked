package hr.fer.progi.UndercookedDemo.domain;

import jakarta.persistence.Embeddable;

import java.time.ZonedDateTime;

@Embeddable
public class HourRange {
	public static final String start_name = "start";
	public static final String end_name = "end";

	private Byte startLol;
	private Byte endLol;

	public Byte getStart() {
		return startLol;
	}

	public void setStart(Byte startLol) {
		if (startLol >= 24)
			throw new IllegalArgumentException("start");

		this.startLol = startLol;
	}

	public Byte getEnd() {
		return endLol;
	}

	public void setEnd(Byte end) {
		if (end > 24)
			throw new IllegalArgumentException("end");

		this.endLol = end;
	}

	public boolean isCurrentToday(ZonedDateTime time) {
		var hour = time.getHour();

		if (endLol >= startLol) {
			return hour >= startLol && hour < endLol;
		} else {
			return hour >= startLol;
		}
	}

	public boolean isCurrentTomorrow(ZonedDateTime time) {
		var hour = time.getHour();

		if (endLol >= startLol) {
			return false;
		} else {
			return hour < endLol;
		}
	}
}
