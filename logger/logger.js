import logger from "./logConfig.js";

logger.info("Main logger initialized.");
logger.info("Main logger started.");
logger.info("Main logger is running.");
logger.info("Main logger is working.");
logger.info("Main logger is logging.");

try {
    throw new Error("An error occurred in the main logger.");
} catch (error) {
    logger.error(`Error in logger: ${error.message}`);
    logger.error(error.stack); // log the stack trace for debugging
};
