import React, {ComponentProps, memo} from "react";

import classnames from "classnames";

import {Icon, IconProps} from "addon-ui";

import {getAddonPayPaywallOptions} from "../../api";

import styles from "./rating.scss";

interface RatingProps extends ComponentProps<'div'> {
    rating: number;
    size?: number;
}

const Rating = (props: RatingProps) => {
    const {className, rating, size = 10, ...other} = props;

    return (
        <div className={classnames(styles['rating'], className)} {...other}>
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    percent={Math.max(0, Math.min(1, rating - (value - 1))) * 100}
                    size={size}
                />
            ))}
        </div>
    );
};

interface StarProps extends Omit<IconProps, 'name'> {
    percent: number;
}

const Star = (props: StarProps) => {
    const {className, percent, ...other} = props;

    const {icons} = getAddonPayPaywallOptions();

    if (!icons?.rating) return;

    return (
        <div className={classnames(styles['star'], className)}>
            <Icon name={icons.rating} {...other}/>

            <div className={styles['star-container']} style={{width: `${percent}%`}}>
                <Icon name={icons.rating} className={styles['star--main']} {...other}/>
            </div>
        </div>
    );
};

export default memo(Rating);
