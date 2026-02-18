const ExcelJS = require('exceljs');
const Profile = require('../models/profile');

async function exportProfiles(req, res) {
    try {
        const profiles = await Profile.find().lean();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Scraped Profiles');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Headline', key: 'headline', width: 35 },
            { header: 'Job Title', key: 'jobTitle', width: 25 },
            { header: 'Company Name', key: 'companyName', width: 25 },
            { header: 'Location', key: 'location', width: 25 },
            { header: 'Industry', key: 'industry', width: 25 },
            { header: 'Followers', key: 'followers', width: 15 },
            { header: 'Skills', key: 'skills', width: 40 },
            { header: 'Educations', key: 'educations', width: 40 },
            { header: 'Emails', key: 'emails', width: 30 },
            { header: 'Phones', key: 'phones', width: 20 },
            { header: 'Source URL', key: 'sourceUrl', width: 40 },
            { header: 'Scraped At', key: 'scrapedAt', width: 25 }
        ];

        profiles.forEach(profile => {
            worksheet.addRow({
                name: profile.name || '',
                headline: profile.headline || '',
                jobTitle: profile.jobTitle || '',
                companyName: profile.companyName || '',
                location: profile.location || '',
                industry: profile.industry || '',
                followers: profile.followers || 0,
                skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
                educations: Array.isArray(profile.educations) ? profile.educations.join(', ') : '',
                emails: Array.isArray(profile.emails) ? profile.emails.join(', ') : '',
                phones: Array.isArray(profile.phones) ? profile.phones.join(', ') : '',
                sourceUrl: profile.sourceUrl || '',
                scrapedAt: profile.scrapedAt || ''
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
