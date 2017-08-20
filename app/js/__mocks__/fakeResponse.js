

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
                    },
                    {
                        name: "count",
                        label: "count"
                    }
                ]
            },
            rows: [
                {
                    date_created: "2010-04-26T13:25:00.000+0530",
                    username: "daemon",
                    count: 2
                },
                {
                    date_created: "2017-06-08T21:37:18.000+0530",
                    username: "clerk",
                    count: 13
                },
                {
                    date_created: "2017-07-08T21:37:18.000+0530",
                    username: "nurse",
                    count: 5
                },
                {
                    date_created: "2017-07-08T21:37:19.000+0530",
                    username: "doctor",
                    count: 1
                },
                {
                    date_created: "2017-07-08T21:37:18.000+0530",
                    username: "sysadmin",
                    count: 4
                }
            ]
        }
    ],
    definition: {
        name: 'test report'
    }

};