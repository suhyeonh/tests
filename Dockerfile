# Stage 1: Build stage
FROM govcmstesting/php:8.1-cli as builder

# Set the working directory to "/tests/"
WORKDIR /tests/

# Copy the project's "composer.json" file into the container
COPY ./composer.json .

# Update PHP dependencies using Composer, utilizing a cache for better performance
RUN --mount=type=cache,mode=0777,target=/root/.composer/cache composer update

# Change the working directory to "/tests/cy"
COPY phpcs.xml .
COPY phpcs.govcms.xml .

# Copy the contents of the local "cy" directory into the container's working directory
COPY ./cy ./cy

# Stage 2: Final stage
FROM alpine:3

# Copy the build artifacts from the "builder" stage into the final image
COPY --from=builder /tests /tests

# Set the working directory to "/tests/"
WORKDIR /tests/