import {
  space12,
  space16,
  space20,
  space24,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { icons } from "./icons.json";

export const iconList = Object.keys(icons);

export type IconType = keyof typeof icons;

const iconClassMap = Object.fromEntries(
  Object.entries(icons).map(([name, object]) => [name, object.class])
);

const cvaIcon = cva(["block"], {
  variants: {
    icon: iconClassMap,
    size: {
      s: [`w-[--size-s]`, `h-[--size-s]`],
      m: [`w-[--size-m]`, `h-[--size-m]`],
      l: [`w-[--size-l]`, `h-[--size-l]`],
      xl: [`w-[--size-xl]`, `h-[--size-xl]`],
    },
    color: {
      black: ["text-black"],
      white: ["text-white"],
      default: ["text-[--default-color]"],
      current: [], // uses `currentColor`
    },
  },
});

export type IconVariantProps = MergeVariantProps<typeof cvaIcon>;

/**
 * Icon component is component that can use icons provided by DDS.
 *
 * If you try to call an icon that has not been registered, a warning will be displayed in the development environment console.
 *
 * If you want to change the color of the icon to a custom value, specify `current` in the `color` property and then add the text color. For example, this method is useful if you want to use Daikin Blue.
 *
 * @example
 *
 * ```html
 * <daikin-icon icon="information" color="black" size="m"></daikin-icon>
 * ```
 */
@customElement("daikin-icon")
export class DaikinIcon extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --size-s: ${unsafeCSS(space12)};
      --size-m: ${unsafeCSS(space16)};
      --size-l: ${unsafeCSS(space20)};
      --size-xl: ${unsafeCSS(space24)};

      display: block;
      width: max-content;
    }
  `;

  /**
   * Specify the name of the icon
   */
  @property({ type: String, reflect: true })
  icon: IconType | null = null;

  /**
   * Specify icon color
   */
  @property({ type: String, reflect: true })
  color: IconVariantProps["color"] = "default";

  /**
   * Specify the height and width of the icon
   */
  @property({ type: String, reflect: true })
  size: IconVariantProps["size"] = "m";

  override render() {
    const defaultColor = (
      icons as Record<string, (typeof icons)[keyof typeof icons] | undefined>
    )[this.icon ?? ""]?.color;

    if (import.meta.env.DEV) {
      if (!this.icon) {
        console.warn("icon property is not specified");
      } else if (!(this.icon in icons)) {
        console.warn(`There is no icon named "${this.icon}".`);
      } else if (this.color === "default" && !defaultColor) {
        console.warn(`The icon "${this.icon}" does not have a default color.`);
      }
    }

    return html`<span
      class=${cvaIcon({
        icon: this.icon,
        color: this.color,
        size: this.size,
      })}
      style=${`--default-color:${defaultColor ?? "#000000"}`}
      role="presentation"
    ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-icon": DaikinIcon;
  }
}

export default DaikinIcon;
