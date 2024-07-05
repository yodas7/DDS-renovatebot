import "#package/components/checkbox/daikin-checkbox";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCheckboxStoryArgs } from "./common";

export const metadata: Meta<DaikinCheckboxStoryArgs> = {
  render: ({
    disabled,
    readonly,
    size,
    checkState,
    label,
    labelPosition,
    onChange,
    onClick,
  }) => html`
    <daikin-checkbox
      ?disabled=${disabled}
      ?readonly=${readonly}
      size=${size}
      check-state=${checkState}
      label=${label}
      label-position=${labelPosition}
      @change=${onChange}
      @click=${onClick}
    >
    </daikin-checkbox>
  `,
};
