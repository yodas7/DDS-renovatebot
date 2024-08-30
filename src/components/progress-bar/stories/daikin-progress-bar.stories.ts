import { metadata } from "#storybook-framework";
import { DAIKIN_PROGRESS_BAR_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Progress Bar",
  tags: ["autodocs"],
  argTypes: DAIKIN_PROGRESS_BAR_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: 40,
    variant: "inprogress",
    max: 100,
    helper: "Progress bar helper",
  },
};

export const Completed: Story = {
  args: {
    ...Default.args,
    value: 100,
    variant: "completed",
  },
};

export const Indeterminate: Story = {
  args: {
    ...Default.args,
    value: 0,
    variant: "indeterminate",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    variant: "error",
  },
};