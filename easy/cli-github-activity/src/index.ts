#!/usr/bin/env tsx

const [user]: string[] = process.argv.slice(2);

const getUrlBy = (username: string): string => `https://api.github.com/users/${username}/events?per_page=10`;

const failed = (message: string): void => {
    console.error(message);
        
    process.exit(1);
}

const fecthUserActivity = async (username: string): Promise<any> => {
    try {
        const response = await fetch(getUrlBy(username), { headers: { Accept: 'application/vnd.github+json' } });
        
        if (!response.ok) {
            const notOK = await response.json();

            throw new Error(JSON.stringify(notOK));
        }

        const userActvity = await response.json();

        return userActvity;
    } catch(e) {
        failed(`Something went wrong during github fetch: ${e}`);
    }
}

interface PrintObject {
    type: string;
    action: string;
    repositoryName: string;
}

interface Event {
    repo: { name: string };
    payload: {
        commits: any[];
        action: string;
        ref_type: string;
    };

}

const printify = (actionType: string, message: string, repo: string): PrintObject => ({
    type: actionType,
    action: message,
    repositoryName: repo,
});

const printBy = (event: Event): PrintObject => {
    let toPrint = null;

    switch(event.type) {
        case "PushEvent":
            toPrint = printify(event.type, `Pushed ${event.payload.commits.length} commit(s`, event.repo.name);
            break;
        case "IssuesEvent":
            toPrint = printify(event.type, `${event.payload.action} an issue`, event.repo.name);
            break;
        case "WatchEvent":
            toPrint = printify(event.type, `Starred`, event.repo.name);
            break;
        case "ForkEvent":
            toPrint = printify(event.type, `Forked`, event.repo.name);
            break;
        case "CreateEvent":
            toPrint = printify(event.type, `Created ${event.payload.ref_type}`, event.repo.name);
            break;
        default: 
            toPrint = printify(event.type, ``, event.repo.name);
    }

    return toPrint;
}

const logLatestActivity = async (username: string|undefined): Promise<void> => {
    if (!username) { failed(`Username is required for this utility to work!`); }

    const activities = await fecthUserActivity(username!);

    const printTable: PrintObject[] = [];

    for (let event of activities) {
        const printObj = printBy(event);
        printTable.push(printObj);
    }

    console.table(printTable)

}

logLatestActivity(user);
