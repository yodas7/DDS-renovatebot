import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaToggle = cva(
  [
    "appearance-none",
    "cursor-pointer",
    "relative",
    "bg-daikinNeutral-200",
    "rounded-3xl",
    "transition-color",
    "duration-300",
    "disabled:bg-daikinNeutral-200",

    "before:content-['']",
    "before:absolute",
    "before:rounded-full",
    "before:transition",
    "before:disabled:bg-daikinNeutral-400",
  ],
  {
    variants: {
      size: {
        default: [
          "w-[51px]",
          "h-[31px]",
          "checked:bg-daikinBlue-500",

          "before:h-[27px]",
          "before:w-[27px]",
          "before:bg-white",
          "before:top-[2px]",
          "before:left-[2px]",
          "before:checked:translate-x-5",
        ],
        small: [
          "w-8",
          "h-[14px]",
          "checked:bg-daikinBlue-50",

          "before:h-5",
          "before:w-5",
          "before:top-[-3px]",
          "before:bg-daikinNeutral-600",
          "before:checked:bg-daikinBlue-500",
          "before:checked:translate-x-3",
        ],
      },
    },
  }
);

type ToggleVariantProps = MergeVariantProps<typeof cvaToggle>;

/**
 * The toggle switch component is a UI element that allows users to switch between two states, typically "on" and "off".
 * It functions similarly to a `daikin-checkbox` component but provides a more visually intuitive way to represent binary options.
 * This component is ideal for scenarios where the binary choice has a significant or immediate effect, such as enabling or disabling a feature or setting.
 * Unlike `daikin-checkbox`, this component doesn't have a label and a "indeterminate" state.
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="checkbox">` element.
 *
 * @example
 *
 * ```html
 * <daikin-toggle name="name" value="value"></daikin-toggle>
 * ```
 */
@customElement("daikin-toggle")
export class DaikinToggle extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
    }
  `;

  static readonly formAssociated = true;

  // define _internals to let toggle can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleChange(event: Event) {
    // DDS-1317 To ensure `event.target.checked` has the correct value, we have to update `this.checked` before emitting the "change" event.
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  /**
   * Specify the component size
   */
  @property({ type: String })
  size: ToggleVariantProps["size"] = "default";

  /**
   * Specify whether the Toggle should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the control is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The value.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify whether the Toggle is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  override render() {
    const toggleClassName = cvaToggle({ size: this.size });

    return html`<input
      class=${toggleClassName}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      .checked=${this.checked}
      ?disabled=${this.disabled}
      @change=${this._handleChange}
    />`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-toggle": DaikinToggle;
  }
}
