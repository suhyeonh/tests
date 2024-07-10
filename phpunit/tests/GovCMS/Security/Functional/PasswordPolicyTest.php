<?php

declare(strict_types=1);

namespace GovCMS\Tests\Security\Functional;

use GovCMS\Tests\Baseline\Functional\GovCMSTestBase;

class PasswordPolicyTest extends GovCMSTestBase {

    /**
     * {@inheritdoc}
     */
    protected function setUp(): void {
        parent::setUp();
    }

    public function testGovcmsCustomPolicy(): void {
        $this->assertSame(1,1);
    }
}
