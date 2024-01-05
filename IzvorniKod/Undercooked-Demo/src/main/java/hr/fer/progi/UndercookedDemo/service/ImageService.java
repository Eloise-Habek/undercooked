package hr.fer.progi.UndercookedDemo.service;

import hr.fer.progi.UndercookedDemo.dao.RecipeRepository;
import hr.fer.progi.UndercookedDemo.domain.ImageData;
import hr.fer.progi.UndercookedDemo.domain.Recipe;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {

	private final RecipeRepository recipeRepository;

	public ImageService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}

	public ImageData getImage(Recipe recipe) {
		return recipe.getImage();
	}

	public void upload(Recipe recipe, MultipartFile file) throws IOException {
		var image = new ImageData();
		image.setData(file.getBytes());

		Assert.notNull(file.getContentType(), "Null content type");
		image.setMediaType(MediaType.parseMediaType(file.getContentType()));

		recipe.setImage(image);
		recipeRepository.save(recipe);
	}

	public boolean deleteImage(Recipe recipe) {
		var image = recipe.getImage();

		if (image == null)
			return false;

		recipe.setImage(null);
		recipeRepository.save(recipe);
		return true;
	}

}
