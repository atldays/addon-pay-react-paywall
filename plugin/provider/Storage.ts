import {Storage, StorageWatchOptions} from "@addon-core/storage";

import _merge from "lodash/merge";

import {SubscriptionStorageContract} from "./types";

const storageKey = 'addon-pay';

export type StorageContract = Record<typeof storageKey, SubscriptionStorageContract>

export class SubscriptionStorage {
    private storage = new Storage<StorageContract>();
    private readonly key = storageKey;

    async get(): Promise<SubscriptionStorageContract | undefined> {
        return this.storage.get(this.key);
    }

    async set(value: SubscriptionStorageContract): Promise<void> {
        await this.storage.set(this.key, value);
    }

    async update(value: Partial<SubscriptionStorageContract>): Promise<SubscriptionStorageContract | undefined> {
        return this.storage.update(this.key, (prev) => {
            return _merge({}, prev, value);
        });
    }

    async remove(): Promise<void> {
        await this.storage.remove(this.key);
    }

    watch(options: StorageWatchOptions<StorageContract>): Function {
        return this.storage.watch(options);
    }
}
