package hr.fer.progi.UndercookedDemo.rest.recipe;

import hr.fer.progi.UndercookedDemo.service.ImageService;
import hr.fer.progi.UndercookedDemo.service.PersonService;
import hr.fer.progi.UndercookedDemo.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping(("/recipes/{id}/image"))
public class ImageController {

	private final long file_upload_limit = 8 * 1024 * 1024; // 8 MiB

	private final RecipeService recipeService;
	private final PersonService personService;
	private final ImageService imageService;

	public ImageController(RecipeService recipeService, PersonService personService, ImageService imageService) {
		this.recipeService = recipeService;
		this.personService = personService;
		this.imageService = imageService;
	}

	@GetMapping
	public ResponseEntity<?> get(@PathVariable("id") Long recipeId) {
		var recipe = recipeService.findById(recipeId);
		var image = imageService.getImage(recipe);

		if (image == null)
			return ResponseEntity.notFound().build();

		var data = image.getData();

		if (data == null)
			return ResponseEntity.internalServerError().build();

		return ResponseEntity.ok()
				.contentType(image.getMediaType())
				.body(data);
	}

	@PostMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public ResponseEntity<?> post(@PathVariable("id") Long recipeId, Principal principal, MultipartFile file) throws IOException {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		if (!RecipeController.authorisedToModify(recipe, person))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

		if (file == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

		if (file.getContentType() == null)
			return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).build();

		if (file.isEmpty())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

		if (file.getSize() > file_upload_limit)
			return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).build();

		imageService.upload(recipe, file);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping
	@PreAuthorize("hasAuthority('SCOPE_ROLE_USER')")
	public ResponseEntity<?> delete(@PathVariable("id") Long recipeId, Principal principal) {
		var person = personService.fromPrincipal(principal);
		var recipe = recipeService.findById(recipeId);

		if (!RecipeController.authorisedToModify(recipe, person))
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

		return imageService.deleteImage(recipe)
				? ResponseEntity.ok().build()
				: ResponseEntity.notFound().build();
	}

}
