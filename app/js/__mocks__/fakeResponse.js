

export const FAKE_RESPONSE = {
    dataSets: [
        {
            metadata: {
                columns: [
                    {
                        name: "username",
                        label: "username"
                    },
                    {
                        name: "date_created",
                        label: "date_created"
                    }
                ]
            },
            rows: [
                {
                    date_created: "2010-04-26T13:25:00.000+0530",
                    username: "daemon"
                },
                {
                    date_created: "2017-06-08T21:37:18.000+0530",
                    username: "clerk"
                },
                {
                    date_created: "2017-07-08T21:37:18.000+0530",
                    username: "nurse"
                },
                {
                    date_created: "2017-07-08T21:37:19.000+0530",
                    username: "doctor"
                },
                {
                    date_created: "2017-07-08T21:37:18.000+0530",
                    username: "sysadmin"
                }
            ]
        }
    ],
    definition: {
        name: 'test report'
    }

};