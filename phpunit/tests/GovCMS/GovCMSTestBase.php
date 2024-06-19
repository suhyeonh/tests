<?php

namespace GovCMS\Tests;

use Drupal\Tests\BrowserTestBase;

abstract class GovCMSTestBase extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected static $modules = ['govcms_security'];

  /**
   * The installation profile to use with this test.
   *
   * @var string
   */
  protected $profile = 'govcms';

}
