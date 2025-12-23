import twilio from 'twilio';
import EscalationLog from '../models/EscalationLog.js';

// Initialize Twilio client
const getTwilioClient = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (!accountSid || !authToken) {
    console.warn('Twilio credentials not configured. Escalation calls will be simulated.');
    return null;
  }

  return twilio(accountSid, authToken);
};

/**
 * Trigger emergency call to the user's emergency contact
 * @param {string} userId - The user ID
 * @param {string} userName - The user's name
 * @param {string} emergencyPhoneNumber - The emergency contact's phone number
 * @param {string} sessionId - The chat session ID
 * @param {number} severityRating - The AI-generated severity rating
 * @returns {Promise<Object>} Result of the escalation attempt
 */
export const triggerEmergencyEscalation = async (
  userId,
  userName,
  emergencyPhoneNumber,
  sessionId,
  severityRating
) => {
  try {
    const client = getTwilioClient();
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    // Log the escalation attempt
    const escalationLog = new EscalationLog({
      userId,
      sessionId,
      severityRating,
      phoneNumberCalled: emergencyPhoneNumber,
      userName,
      result: 'pending'
    });

    let callSid = null;

    if (client && twilioPhoneNumber) {
      try {
        // Make the emergency call with TTS message
        const call = await client.calls.create({
          url: generateTwiMLUrl(userName, severityRating),
          to: emergencyPhoneNumber,
          from: twilioPhoneNumber
        });

        callSid = call.sid;
        escalationLog.twilioCallSid = callSid;
        escalationLog.result = 'success';

        console.log(`[ESCALATION] Emergency call placed to ${emergencyPhoneNumber} for user ${userName}`);
      } catch (twilioError) {
        escalationLog.result = 'failed';
        escalationLog.errorMessage = twilioError.message;
        console.error('[ESCALATION] Twilio call failed:', twilioError.message);
      }
    } else {
      // Simulation mode for development/testing
      console.warn(`[ESCALATION-SIMULATION] Would call ${emergencyPhoneNumber} for user ${userName} (severity: ${severityRating}/5)`);
      escalationLog.result = 'success';
    }

    // Save the escalation log
    await escalationLog.save();

    return {
      _status: true,
      _message: 'Emergency escalation triggered',
      escalationId: escalationLog._id,
      callSid
    };
  } catch (error) {
    console.error('[ESCALATION-ERROR]:', error.message);
    return {
      _status: false,
      _message: 'Failed to trigger emergency escalation',
      error: error.message
    };
  }
};

/**
 * Generate TwiML URL for Twilio call
 * Returns the URL to your server's TwiML endpoint
 */
const generateTwiMLUrl = (userName, severityRating) => {
  const baseUrl = process.env.TWIML_BASE_URL || 'http://localhost:8000';
  const encodedName = encodeURIComponent(userName);
  return `${baseUrl}/twiml/emergency-call?userName=${encodedName}&severity=${severityRating}`;
};

/**
 * Log escalation event for audit trail
 * @param {Object} escalationData - Data about the escalation
 */
export const logEscalation = async (escalationData) => {
  try {
    const log = new EscalationLog(escalationData);
    await log.save();
    return log;
  } catch (error) {
    console.error('Failed to log escalation:', error.message);
    throw error;
  }
};

/**
 * Get escalation threshold from environment
 */
export const getEscalationThreshold = () => {
  return parseInt(process.env.ESCALATION_SEVERITY_THRESHOLD || '4', 10);
};
