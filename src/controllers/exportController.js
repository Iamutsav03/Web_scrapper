const ExcelJS = require('exceljs');
const Profile = require('../models/profile');

async function exportProfiles(req, res) {
    try {
        const profiles = await Profile.find().lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Scraped Profiles');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Emails', key: 'emails', width: 30 },
            { header: 'Phones', key: 'phones', width: 20 },
            { header: 'Source URL', key: 'sourceUrl', width: 40 },
            { header: 'Scraped At', key: 'scrapedAt', width: 25 }
        ];

        profiles.forEach(profile => {
            worksheet.addRow({
                name: profile.name,
                emails: Array.isArray(profile.emails) ? profile.emails.join(', ') : '',
                phones: Array.isArray(profile.phones) ? profile.phones.join(', ') : '',
                sourceUrl: profile.sourceUrl,
                scrapedAt: profile.scrapedAt
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=scraped_profiles.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Export error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to export profiles'
        });
    }
}

module.exports = { exportProfiles };
