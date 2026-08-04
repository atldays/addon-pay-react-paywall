import React, {useCallback} from "react";

import {getPageUrl} from "adnbn";
import {LocaleProvider} from "adnbn/locale/react";
import {Button, TextField, UIProvider} from "addon-ui";
import {openOrCreateTabByUrl} from "@addon-core/browser";

import {SubscriptionStorage} from "./provider/Storage";
import {PluginName} from "./types";

export const title = "Add Email";

export const as = "add-email";

const storage = new SubscriptionStorage();

export const openAddEmailPage = async (): Promise<void> => {
    try {
        await openOrCreateTabByUrl(getPageUrl(`${PluginName}/page`));
    } catch (e) {
        console.error(`${PluginName}. Failed opening page`, e);
    }
};

// Page for testing email functioanality
const Page = () => {
    const [value, setValue] = React.useState('');

    const handleAddEmail = useCallback(() => {
        if (value.trim().length) {
            storage.update({email: value})
                .then(() => window.close())
                .catch(console.error);
        }
    }, [value]);

    return (
        <UIProvider storage={true}>
            <LocaleProvider>
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}>
                    <TextField value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Button onClick={handleAddEmail}>Add email</Button>
                </div>
            </LocaleProvider>
        </UIProvider>
    );
};

export default Page;
