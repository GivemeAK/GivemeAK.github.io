document.addEventListener('DOMContentLoaded', function () {
    if (!window.mermaid) {
        return;
    }

    var postContainer = document.querySelector('.post-container');
    if (!postContainer) {
        return;
    }

    mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'default'
    });

    var codeNodes = postContainer.querySelectorAll(
        'pre > code.language-mermaid, .language-mermaid pre > code, .language-mermaid code'
    );

    var seenBlocks = new Set();
    var mermaidBlocks = [];

    Array.prototype.forEach.call(codeNodes, function (codeNode) {
        var source = codeNode.textContent.trim();
        if (!source) {
            return;
        }

        var block =
            codeNode.closest('.highlighter-rouge') ||
            codeNode.closest('.highlight') ||
            codeNode.closest('pre');

        if (!block || seenBlocks.has(block)) {
            return;
        }
        seenBlocks.add(block);

        var wrapper = document.createElement('div');
        wrapper.className = 'mermaid-wrapper';

        var mermaidNode = document.createElement('div');
        mermaidNode.className = 'mermaid';
        mermaidNode.textContent = source;

        wrapper.appendChild(mermaidNode);
        block.parentNode.replaceChild(wrapper, block);
        mermaidBlocks.push(mermaidNode);
    });

    if (!mermaidBlocks.length) {
        return;
    }

    if (typeof mermaid.run === 'function') {
        mermaid.run({ nodes: mermaidBlocks });
        return;
    }

    mermaid.init(undefined, mermaidBlocks);
});
