const { google } = require('googleapis');
const oauth2Client = require('../config/googleconfig');
const calendar = google.calendar({ version: 'v3' });

const createEvent = async (req, res) => {
    console.log("In booking page");
    const accessToken = req.headers.authorization?.split(' ')[1]; 

    if (!accessToken) {
        return res.status(400).send("Access token is missing.");
    }

    oauth2Client.setCredentials({ access_token: accessToken });

    const event = {
        summary: req.body.summary || 'Sample Event',
        location: req.body.location || 'Somewhere',
        description: req.body.description || 'Sample Event Description',
        start: {
            dateTime: req.body.startTime || '2024-12-20T09:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: req.body.endTime || '2024-12-20T10:00:00-07:00',
            timeZone: 'America/Los_Angeles',
        },
        attendees: [
            {email: "nathgvsk@gmail.com"}
        ],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'popup', minutes: 10 },
            ],
        },
        conferenceData: {
            createRequest: {
                requestId: 'sample123',  
                conferenceSolutionKey: {
                    type: 'hangoutsMeet',
                },
                status: {
                    statusCode: 'success',
                },
            },
        },
    };

    try {
        const response = await calendar.events.insert({
            auth: oauth2Client,  
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1,
        });

        res.json({
            message: 'Event created successfully with Google Meet!',
            event: response.data,
            googleMeetLink: response.data.hangoutLink,
        });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event');
    }
};


module.exports = { createEvent };
