<?php

namespace GovCMS\Tests\Functional\Baseline;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests UID 1 access to the GovCMS system and Drupal status reports.
 *
 * @group govcms
 */
class UID1ReportAccessTest extends BrowserTestBase {

    /**
     * {@inheritdoc}
     */
    protected $profile = 'govcms';

    /**
     * {@inheritdoc}
     */
    protected $defaultTheme = 'stark';

    /**
     * Tests that UID 1 has access to the GovCMS system report and Drupal status report.
     */
    public function testUid1Access(): void {
        // Log out the current user to ensure a clean state.
        $this->drupalLogout();

        // Log in as the user with UID 1.
        $this->drupalLogin(\Drupal\user\Entity\User::load(1));

        // Check that UID 1 can access the GovCMS system report page.
        $this->drupalGet('admin/reports/system-report');
        $this->assertSession()->statusCodeEquals(200);

        // Verify that UID 1 can access the standard Drupal status page.
        $this->drupalGet('admin/reports/status');
        $this->assertSession()->statusCodeEquals(200);

        // Log out to clean up the test environment.
        $this->drupalLogout();
    }
}