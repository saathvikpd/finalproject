function HuffmanNode() {
    this.data = '0';
    this.c = '';
    this.left = this.right = null;
    this.x = 0;
    this.y = 0;
}

HuffmanNode.prototype.addNode = function(huffmanQueue, data, freq){
    let tempNode = new HuffmanNode();
    tempNode.c = data;
    tempNode.data = freq;
    tempNode.left = null;
    tempNode.right = null;
    huffmanQueue.push(tempNode);
}

HuffmanNode.prototype.buildTree = function(huffmanQueue){
    let root = null;
    huffmanQueue.sort(function(a,b){return a.data-b.data;});

    while (huffmanQueue.length > 1) {
        let x = huffmanQueue[0];
        huffmanQueue.shift();
        let y = huffmanQueue[0];
        huffmanQueue.shift();
        let tempNode = new HuffmanNode();
        tempNode.data = x.data + y.data;
        tempNode.c = '-';
        tempNode.left = x;
        tempNode.right = y;
        root = tempNode;
        huffmanQueue.push(tempNode);
        huffmanQueue.sort(function(a,b){return a.data-b.data;});
    }
    return root;
}

HuffmanNode.prototype.printCode = function(root, depth, codes){        
    displayTree(root, root, depth);
    getCodes(root, "", codes);
}

function displayTree(root, parent, depth){
    if (root.left == null && root.right == null) {
        textData = root.c + "/" + root.data;        
        drawTree(root, parent, textData);
        return;
    }
    drawTree(root, parent, root.data);

    const dx = (width - 80) / (pow(2,  depth + 1));
    root.left.x = root.x - dx;
    root.left.y = root.y + 50;
    displayTree(root.left, root, depth+1);
    root.right.x = root.x + dx;
    root.right.y = root.y + 50;
    displayTree(root.right, root,  depth+1);
}

let hoveredNode = null;

function drawTree(root, parent, textData) {
    hoveredNode = getHoveredNode(root); // Check if the mouse is over the node

    stroke(128, 0, 128);
    line(root.x, root.y, parent.x, parent.y);

    if (hoveredNode === root) {
        fill(173, 216, 230, 150); // Set fill color to a lighter blue with opacity
    } else {
        fill(173, 216, 230);
    }

    ellipse(root.x, root.y, 50, 50);

    fill(0);
    noStroke();
    textAlign(CENTER);
    text(textData, root.x, root.y + 5);
}

function isMouseOverNode(node) {
    return mouseX > node.x - 25 && mouseX < node.x + 25 && mouseY > node.y - 25 && mouseY < node.y + 25;

}

function HuffmanCode(c, freq, code){
    this.c = c;
    this.freq = freq;
    this.code = code;
}

function getCodes(root, s, codes){
    if (root.left == null && root.right == null) {
        let huffCode = new HuffmanCode(root.c, root.data, s);
        codes.push(huffCode);
        return;
    }
    getCodes(root.left, s + "0", codes);
    getCodes(root.right, s + "1", codes);
}

function mouseMoved() {
    hoveredNode = getHoveredNode(root);
}

function getHoveredNode(node) {
    if (node.left == null && node.right == null) {
        return isMouseOverNode(node) ? node : null;
    }

    const leftHovered = getHoveredNode(node.left);
    if (leftHovered) return leftHovered;

    const rightHovered = getHoveredNode(node.right);
    return rightHovered;
}
