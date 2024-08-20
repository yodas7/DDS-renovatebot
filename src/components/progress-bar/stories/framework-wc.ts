import "#package/components/progress-bar/daikin-progress-bar";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinProgressBarStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressBarStoryArgs> = {
  render: ({ value, variant, max, helper }) => html`
    <daikin-progress-bar
      value=${value}
      variant=${variant}
      max=${max}
      helper=${helper}
    >
      Progress bar label
    </daikin-progress-bar>
  `,
};
