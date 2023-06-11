## Production (DigitalOcean + Docker)

### Publishing

* Ensure SSH connection is set up to Docker droplet for `root` user
* Run `npm run publish` to publish files directly to nginx directory on droplet

## Notes

* Gave up trying to get Docker image for React app working because it seemed overly-complex
* React compiles to static site anyways, so manually publishing files is just easier!