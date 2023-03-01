declare module '*.scss' {
  /**
   * @description This declare makes it possible to use scss modules
   */

  const content: { [className: string]: string };
  export default content;
}
