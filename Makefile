.PHONY: buildx-setup build-php81 build-php82 build-php83 build-ci-php81 build-ci-php82 build-ci-php83 test-php81 test-php82 test-php83 test-ci-php81 test-ci-php82 test-ci-php83 push-php81 push-php82 push-php83 push-ci-php81 push-ci-php82 push-ci-php83 php ci all release-php release-ci release-all

# Default version variable
VERSION ?= latest

# Target to create and use Buildx builder if it doesn't already exist
buildx-setup:
	@echo "Setting up Docker Buildx"
	@if [ -z "$$(docker buildx ls | grep govcms)" ]; then \
		docker buildx create --name govcms --use; \
	else \
		docker buildx use govcms; \
	fi
	docker buildx inspect --bootstrap

# Targets for building govcmstesting/tests images locally
build-php81: buildx-setup
	@echo "Building Docker image for govcmstesting/tests with PHP 8.1"
	docker buildx build --load --build-arg PHP_VERSION=8.1 -t govcmstesting/tests:$(VERSION)-php8.1 -f Dockerfile .

build-php82: buildx-setup
	@echo "Building Docker image for govcmstesting/tests with PHP 8.2"
	docker buildx build --load --build-arg PHP_VERSION=8.2 -t govcmstesting/tests:$(VERSION)-php8.2 -f Dockerfile .

build-php83: buildx-setup
	@echo "Building Docker image for govcmstesting/tests with PHP 8.3"
	docker buildx build --load --build-arg PHP_VERSION=8.3 -t govcmstesting/tests:$(VERSION)-php8.3 -f Dockerfile .

# Targets for building govcmstesting/ci images locally
build-ci-php81: buildx-setup
	@echo "Building Docker image for govcmstesting/ci with PHP 8.1"
	docker buildx build --load --build-arg PHP_VERSION=8.1 -t govcmstesting/ci:$(VERSION)-php8.1-apache -f Dockerfile.ci .

build-ci-php82: buildx-setup
	@echo "Building Docker image for govcmstesting/ci with PHP 8.2"
	docker buildx build --load --build-arg PHP_VERSION=8.2 -t govcmstesting/ci:$(VERSION)-php8.2-apache -f Dockerfile.ci .

build-ci-php83: buildx-setup
	@echo "Building Docker image for govcmstesting/ci with PHP 8.3"
	docker buildx build --load --build-arg PHP_VERSION=8.3 -t govcmstesting/ci:$(VERSION)-php8.3-apache -f Dockerfile.ci .

# Targets for skipping tests on govcmstesting/tests images
test-php81:
	@echo "Skipping test for govcmstesting/tests with PHP 8.1"

test-php82:
	@echo "Skipping test for govcmstesting/tests with PHP 8.2"

test-php83:
	@echo "Skipping test for govcmstesting/tests with PHP 8.3"

# Targets for testing the built images (only for ci images)
test-ci-php81:
	@echo "Testing Docker image for govcmstesting/ci with PHP 8.1"
	docker run --rm govcmstesting/ci:$(VERSION)-php8.1-apache php -v

test-ci-php82:
	@echo "Testing Docker image for govcmstesting/ci with PHP 8.2"
	docker run --rm govcmstesting/ci:$(VERSION)-php8.2-apache php -v

test-ci-php83:
	@echo "Testing Docker image for govcmstesting/ci with PHP 8.3"
	docker run --rm govcmstesting/ci:$(VERSION)-php8.3-apache php -v

# Targets for pushing the images with multi-platform support
push-php81: buildx-setup
	@echo "Pushing Docker image for govcmstesting/tests with PHP 8.1"
	docker buildx build --push --build-arg PHP_VERSION=8.1 --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 -t govcmstesting/tests:$(VERSION)-php8.1 -t govcmstesting/tests:latest-php8.1 -f Dockerfile .

push-php82: buildx-setup
	@echo "Pushing Docker image for govcmstesting/tests with PHP 8.2"
	docker buildx build --push --build-arg PHP_VERSION=8.2 --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 -t govcmstesting/tests:$(VERSION)-php8.2 -t govcmstesting/tests:latest-php8.2 -f Dockerfile .

push-php83: buildx-setup
	@echo "Pushing Docker image for govcmstesting/tests with PHP 8.3"
	docker buildx build --push --build-arg PHP_VERSION=8.3 --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 -t govcmstesting/tests:$(VERSION)-php8.3 -t govcmstesting/tests:latest-php8.3 -f Dockerfile .

push-ci-php81: buildx-setup
	@echo "Pushing Docker image for govcmstesting/ci with PHP 8.1"
	docker buildx build --push --build-arg PHP_VERSION=8.1 --platform linux/amd64,linux/arm64 -t govcmstesting/ci:$(VERSION)-php8.1-apache -f Dockerfile.ci .

push-ci-php82: buildx-setup
	@echo "Pushing Docker image for govcmstesting/ci with PHP 8.2"
	docker buildx build --push --build-arg PHP_VERSION=8.2 --platform linux/amd64,linux/arm64 -t govcmstesting/ci:$(VERSION)-php8.2-apache -f Dockerfile.ci .

push-ci-php83: buildx-setup
	@echo "Pushing Docker image for govcmstesting/ci with PHP 8.3"
	docker buildx build --push --build-arg PHP_VERSION=8.3 --platform linux/amd64,linux/arm64 -t govcmstesting/ci:$(VERSION)-php8.3-apache -f Dockerfile.ci .

# Aggregate targets
php: build-php81 build-php82 build-php83 test-php81 test-php82 test-php83
ci: build-ci-php81 build-ci-php82 build-ci-php83 test-ci-php81 test-ci-php82 test-ci-php83
all: php ci

# Targets for building, testing, and pushing images
release-php81: build-php81 test-php81 push-php81
release-php82: build-php82 test-php82 push-php82
release-php83: build-php83 test-php83 push-php83
release-ci-php81: build-ci-php81 test-ci-php81 push-ci-php81
release-ci-php82: build-ci-php82 test-ci-php82 push-ci-php82
release-ci-php83: build-ci-php83 test-ci-php83 push-ci-php83
release-php: release-php81 release-php82 release-php83
release-ci: release-ci-php81 release-ci-php82 release-ci-php83
release-all: release-php release-ci