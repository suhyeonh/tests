<?php

namespace GovCMS\Tests\Modules\Minisite\Functional;

use Drupal\Tests\minisite\Functional\FieldValidationTest as BaseFieldValidationTest;

/**
 * Test class for Minisite functionality with GovCMS profile.
 *
 * @group govcms
 * @group minisite
 */
class MinisiteFieldValidationTest extends BaseFieldValidationTest {

  /**
   * The installation profile to use with this test.
   *
   * @var string
   */
  protected $profile = 'govcms';

  /**
   * Overrides setUp to ensure GovCMS profile is used.
   */
  #[\Override]
  protected function setUp(): void {
    parent::setUp();

    // Get the module handler.
    $module_handler = \Drupal::service('module_handler');
    // Get the version of the minisite module.
    $module_info = $module_handler->getModule('minisite');
    $version = $module_info->info['version'] ?? '0.0.0';

    // Check if the version is less than 2.2.0.
    if (version_compare($version, '2.2.0', '<')) {
      $this->markTestSkipped('Minisite module version is less than 2.2.0.');
    }
  }

}
