import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, userEvent, waitFor } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_ACCORDION_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Accordion Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_ACCORDION_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    title: "Accordion-title",
    open: false,
    disabled: false,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(root).not.toHaveAttribute("open");

    const innerDetails = getByShadowRole(root, "group");
    const innerSummary = getByShadowText(root, "Accordion-title");

    await expect(innerSummary).toBeInTheDocument();

    // As `toBeVisible()` could not determine that the Slot element was not being drawn, as an alternative test,
    // we will check whether the details element has an `open` attribute to confirm that the slot is not being drawn.
    await expect(innerDetails).not.toHaveAttribute("open");

    await step("Try to click inner summary", async () => {
      await userEvent.click(innerSummary);
      await expect(innerDetails).toHaveAttribute("open");
      await expect(getByShadowText(root, "Accordion-content")).toBeVisible();
    });

    await step("Try to keyboard navigation", async () => {
      await userEvent.type(innerSummary, "[Space]");
      await waitFor(() => expect(innerDetails).not.toHaveAttribute("open"), {
        timeout: 500,
      });
    });
  }),
};

export const Open: Story = {
  args: {
    ...Default.args,
    open: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-accordion-item")[0];
    await expect(root).toBeInTheDocument();

    const innerDetails = getByShadowRole(root, "group");
    const innerSummary = getByShadowText(root, "Accordion-title");

    await expect(innerSummary).toBeInTheDocument();
    await expect(innerDetails).not.toHaveAttribute("open");

    // should not react if inner summary clicked
    await step("Try to click inner summary", async () => {
      await userEvent.click(innerSummary);
      await expect(root).not.toHaveAttribute("open");
      await expect(innerDetails).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      await userEvent.type(innerSummary, "[enter]");
      await expect(innerDetails).not.toHaveAttribute("open");
    });
  }),
};
