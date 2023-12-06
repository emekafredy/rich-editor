import { Quill } from "react-quill";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    twitter?: () => void;
  }
}

const BaseBlock = Quill.import("blots/block/embed");

class TwitterBlot extends BaseBlock {
  static blotName = "twitter";
  static tagName = "div";

  static create(value: any) {
    const node = super.create(value);

    function buildInnerHtml(value: any) {
      window.twitter = function () {
        const loadScript = function (url: string) {
          return new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = function () {
              resolve();
            };
            script.onerror = function () {
              reject();
            };
            document.head.appendChild(script);
          });
        };
        if (!window.twttr) {
          loadScript("//platform.twitter.com/widgets.js").then(() => {
            setTimeout(() => {
              window.twttr?.widgets.load();
            }, 100);
          });
        } else {
          setTimeout(() => {
            window.twttr?.widgets.load();
          }, 100);
        }
      };

      return `
        <div contenteditable="false" style="display: flex; width: 100%; height: 200px; overflow: scroll; cursor: pointer;">
          <blockquote class="twitter-tweet"><a tabindex="-1" href="${value.url}"></a>Twitter</blockquote>
          <img src="*" onerror="event.stopPropagation(); event.preventDefault(); window.twitter();" style="width: 100%; height: 100%; display: none;"/>
        </div>
      `;
    }

    const innerHTML = buildInnerHtml(value);
    node.innerHTML = innerHTML;
    node.setAttribute("data-url", value.url);
    return node;
  }

  static value(domNode: HTMLElement) {
    const url = domNode.dataset.url || "";
    return { url };
  }

  index() {
    return 1;
  }
}

export const embedTwitterLink = (quill: any, url: string) => {
  const editor = (quill.current as any).getEditor();
  const range = editor.getSelection(true);

  const embedData = {
    url,
  };

  editor.insertText(range.index, "\n");
  editor.insertEmbed(range.index + 1, "twitter", embedData, "user");
  editor.insertText(range.index + 2, "\n");
};

export default TwitterBlot;
