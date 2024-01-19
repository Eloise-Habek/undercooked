package hr.fer.progi.UndercookedDemo.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import org.springframework.http.MediaType;
import org.springframework.util.Assert;

@Embeddable
public class ImageData {

	String mediaType;

	@Lob
	byte[] data;

	public MediaType getMediaType() {
		return MediaType.parseMediaType(mediaType);
	}

	public void setMediaType(MediaType mediaType) {
		Assert.isTrue(mediaType.getType().equals("image"), "Media type is not image/*");
		this.mediaType = mediaType.toString();
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
