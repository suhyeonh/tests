<?php

namespace GovCMS\Tests\Functional\Baseline;

use Drupal\Core\Url;
use Drupal\Tests\BrowserTestBase;

/**
 * Tests output on the status overview page.
 *
 * @group govcms
 */
class StatusTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $profile = 'govcms';

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * Tests that the status page returns.
   *
   * @group legacy
   */
  public function testStatusPage(): void {
    // Verify if the 'Status report' is the first item link.
    $this->drupalGet('admin/reports');
    $this->assertEquals('GovCMS System Report', $this->cssSelect('.list-group :first-child')[0]->getText());

    // Go to custom system report.
    $this->drupalGet('admin/reports/system-report');
    $this->assertSession()->statusCodeEquals(200);

    // Go to Drupal Administration.
    $this->drupalGet('admin/reports/status');
    $this->assertSession()->statusCodeEquals(403);
  }

  /**
   * {@inheritdoc}
   */
  #[\Override]
  protected function setUp(): void {
    parent::setUp();

    // Unset the sync directory in settings.php to trigger the error.
    $settings['settings']['config_sync_directory'] = (object) [
      'value' => '',
      'required' => TRUE,
    ];
    $this->writeSettings($settings);

    $admin_user = $this->drupalCreateUser([
      'access site reports',
    ]);
    $this->drupalLogin($admin_user);
  }

}
