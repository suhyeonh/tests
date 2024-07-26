<?php

namespace GovCMS\Tests\Integration\GovCMS\Modules\Events_log_track\Functional;

use Drupal\Tests\event_log_track\Functional\EventsLogTrackTestBase as BaseEventsLogTrackTest;

/**
 * Test class for Event log track test functionality with GovCMS profile.
 *
 * @group govcms
 * @group eventlogtrack
 */
class EventLogTrackTest extends BaseEventsLogTrackTest {

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
  }

}
