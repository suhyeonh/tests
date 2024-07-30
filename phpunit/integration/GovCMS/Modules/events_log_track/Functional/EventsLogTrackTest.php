<?php

namespace GovCMS\Tests\Integration\GovCMS\Modules\events_log_track\Functional;

use Drupal\Tests\event_log_track\Functional\EventsLogTrackTestBase as BaseEventsLogTrackTest;

/**
 * Test class for Event log track test functionality with GovCMS profile.
 *
 * @group govcms
 * @group eventlogtrack
 */
class EventsLogTrackTestBase extends BaseEventsLogTrackTest {

    // Use the GovCMS profile
    protected $profile = 'govcms';

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void {
        parent::setUp();
    }
}
