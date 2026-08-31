import {definePlugin} from "adnbn";
import {Configuration as RspackConfig, DefinePlugin} from "@rspack/core";

import {AddonPayPaywallOptions, PluginName} from "./types";

export default definePlugin((options: AddonPayPaywallOptions) => {
    return {
        name: PluginName,
        locale: true,
        page: true,
        bundler: () => {
            return {
                plugins: [
                    new DefinePlugin({
                        __ADDON_PAY_PAYWALL_OPTIONS__: JSON.stringify(options),
                    }),
                ],
            } satisfies RspackConfig;
        },
    };
});
