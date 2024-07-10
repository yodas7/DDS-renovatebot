import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaInput = cva(
  [
    "w-[340px]",
    "h-12",
    "text-daikinNeutral-900",
    "border",
    "border-solid",
    "px-[9px]",
    "rounded-[6px]",
    "font-daikinSerif",
    "placeholder:text-daikinNeutral-200",

    "enabled:hover:outline",
    "enabled:hover:outline-2",
    "enabled:hover:outline-[--text-input-outline-color-hover]",
    "enabled:active:outline",
    "enabled:active:outline-2",
    "enabled:active:outline-[--text-input-outline-color-active]",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-[--text-input-outline-color-active]",
    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:bg-[--text-input-background-color]",
    "disabled:border-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      variant: {
        normal: ["border-daikinNeutral-600"],
        error: ["bg-daikinRed-50", "border-[--text-input-border-color-error]"],
      },
    },
  }
);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-text-input")
export class DaikinTextInput extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --text-input-background-color: #ffffff;
      --text-input-border-color-error: ${unsafeCSS(colorFeedbackNegative)};
      --text-input-outline-color-disabled: #dcdcdc;
      --text-input-outline-color-active: #cecece;
      --text-input-outline-color-hover: #54c3f1;

      display: block;
      width: max-content;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Field value
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Type of field
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the field is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Name of the input field control used in the form
   */
  @property({ type: String, reflect: true })
  name?: string;

  /**
   * Maximum length in field values
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Specify auto-completion values
   */
  @property({ type: String })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  override render() {
    const textInputInputClassName = cvaInput({
      variant: !this.disabled && this.error ? "error" : "normal",
    });

    return html`<input
      class=${textInputInputClassName}
      type=${this.type}
      value=${this.value}
      placeholder=${this.placeholder}
      name=${ifDefined(this.name)}
      maxlength=${ifDefined(this.maxlength)}
      autocomplete=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.autocomplete as any)
      }
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
      @input=${this._handleInput}
    />`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._internals.setFormValue(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-input": DaikinTextInput;
  }
}
