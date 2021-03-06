
module.exports = {
	Debug: 		false,
	Port: 		3001,
	Services: 	[
		'http://localhost:3001/gbl-accessor',
		'http://localhost:3001/gbl-rest',
	],
	Folders: 	{
		Uploads: 	{
			Folder:  'storage',
			Age: 	 365*86400,
			Matcher: /\?(?:\w+=.+)$/,
			Headers: null,
		},
		Publics: 	{
			Folder:  'public',
			Age: 	 365*86400,
			Matcher: /\?(?:\w+=.+)$/,
			Headers: null,
		}
	},
	Session: 	{
		Secret: "jy24xsFDWU5jYnZ2MNFmtCvJOhcDoxlL",
		Age: 	(((1000*60*60)*24)*30),
		REDIS: 	{
			Config: {
				Host: 		'localhost',
				Port: 		6379,
				Password: 	'Pion33r247',
			},
			Main:	'Client',
			Stores: [
				'Users',
				'Limits',
				'Lockers',
				'Messages',
				'Alerts',
				'Comments',
			]
		},
		Auth: 	{
			Flush: 	false,
			SQL: 	{
				Login: 	 "SELECT email_address, user_pass FROM users WHERE email_address = ?",
				Profile: [
					"SELECT u.user_id, u.email_address,",
					"       u.display_name, u.user_pass,",
					"       d.profile_picture AS Photo,",
					"       JSON_COMPACT(JSON_OBJECT(",
					"           'First', u.first_name,",
					"           'Last',  u.last_name",
					"       )) AS Name,",
					"       u.email_address AS Email,",
					"       getAgeFromStr(u.birth_date) AS Age,",
					"       d.profile_sex AS Sex,",
					"       JSON_OBJECT(",
					"           'City',    l.city,",
					"           'Region',  l.region,",
					"           'Country', l.country",
					"       ) AS Location",
					"FROM       users                 u",
					"INNER JOIN user_profile_details  d ON u.user_id = d.user_fk",
					"LEFT  JOIN search_locale         l ON d.location = l.id",
					"LEFT  JOIN regions               r ON r.id = l.region_id",
					"LEFT  JOIN countries             f ON f.id = r.country_id",
					"WHERE      email_address = ?"
				].join('\n')
			},
			Format: {
				Account: 	'email_address',
				Profile: 	[
					'Photo', 'Name', 'Email', 'Age', 'Sex', 'Location'
				],
				Scopes: [
					'user_id',
					'display_name',
					'email_address',
					'user_pass',
				]
			}
		},
		Limits: {
			All: {
				"IP/Day": {
					total: 5000, method: 'all',
					lookup: ['connection.remoteAddress'],
				},
				"API/Second": {
					total: 50,   method: 'all',
					lookup: ['connection.remoteAddress'],
					omit: [
						'/locale/',
						'/locale/search/',
						'/locale/search/city/',
						'/locale/search/region/',
						'/locale/search/country/',
						'/locale/timezone/',
						'/hobbies/search/',
						'/languages/search/',
						'/nationalities/search/',
						'/religions/search/',
						'/genders/search/'
					]
				},
				"TokenIP/Day": {
					total: 2500, method: 'all', 
					lookup: ['headers.token', 'connection.remoteAddress']
				}
			},
			Optional: {
				"New/Day": {
					total: 3,    method: 'post',
					lookup: ['connection.remoteAddress']
				},
				"Tries/Day": {
					total: 5,    method: 'post', 
					lookup: ['connection.remoteAddress']
				},
				"Tries/Second": {
					total: 5,     method: 'post', 
					lookup: ['connection.remoteAddress']
				},
				"Constant/Second": {
					total: 200,   method: 'get',
					lookup: ['connection.remoteAddress']
				}
			}
		}
	}
};
