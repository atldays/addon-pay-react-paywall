import React, {memo} from "react";
import {addDays as _addDays, format} from "date-fns";

import {
    Button,
    ButtonSize,
    IconButton,
    Popover,
    PopoverContent,
    PopoverContentProps,
    PopoverTrigger,
    TextField
} from "addon-ui";

import {useCurrentTime} from "../hooks";
import {useAddonPay} from "./index";

import {SubscriptionStorage} from "./Storage";
import {SubscriptionStatus} from "../types";

const storage = new SubscriptionStorage();

interface AddonPayPaywallSettingsProps extends PopoverContentProps {

}

// Component for testing
const AddonPayPaywallSettings = (props: AddonPayPaywallSettingsProps) => {
    const {status, pro, email, resetPaidOptions, update} = useAddonPay();

    const {currentTime, setCurrentTime, resetCurrentTime} = useCurrentTime();

    const resetStatus = () => {
        storage.set({}).catch();
        resetPaidOptions().catch();
    };

    const resetEmail = () => {
        update({email: undefined});
    };

    const addDays = (count: number) => {
        setCurrentTime(_addDays(new Date(currentTime), count).getTime());
    };

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <IconButton style={{border: 'none', background: 'none', padding: '0px'}}>
                    <span style={{fontSize: '20px'}}>⚙️</span>
                </IconButton>
            </PopoverTrigger>
            <PopoverContent
                sideOffset={5}
                arrow={true}
                {...props}
            >
                <div style={{display: "flex", flexDirection: "column", gap: '10px', padding: '15px'}}>
                    <div style={{display: "flex", alignItems: "center", gap: '40px', justifyContent: 'space-between'}}>
                        <Button onClick={resetCurrentTime}>Reset time</Button>
                        <div style={{display: "flex", alignItems: "center", gap: '10px'}}>
                            <Button size={ButtonSize.Small} onClick={() => addDays(-1)}>-1</Button>
                            <TextField
                                type="date"
                                value={currentTime ? format(currentTime, 'yyyy-MM-dd') : ''}
                                onChange={(e) => setCurrentTime(new Date(e.target.value).getTime())}
                            />
                            <Button size={ButtonSize.Small} onClick={() => addDays(1)}>+1</Button>
                        </div>
                    </div>

                    <div style={{display: "flex", alignItems: "center", gap: '40px', justifyContent: 'space-between'}}>
                        <Button onClick={resetStatus}>Reset status</Button>
                        <span>Status: {status || 'unknown'}{(status === SubscriptionStatus.Pro && pro?.plan) && ` (${pro.plan})`}</span>
                    </div>

                    <div style={{display: "flex", alignItems: "center", gap: '40px', justifyContent: 'space-between'}}>
                        <Button onClick={resetEmail}>Reset email</Button>
                        <span>Email: {email || 'unknown'}</span>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default memo(AddonPayPaywallSettings);
