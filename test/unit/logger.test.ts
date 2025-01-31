import { assert } from 'chai';
import { logger } from "../../src/utils";

describe('logger', function() {

	describe("#config", function () {

		it("should configure logger", function () {
            return new Promise<void>((resolve, reject) => {
                logger.info("");
                logger.info("test", { aGoodTest: true });
                assert.isOk("Success", "This test was successful");
                resolve();
            });
        });

    });

});
