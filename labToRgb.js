function matrixDot (A, B) {
    var result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));

    return result.map((row, i) => {
        return row.map((val, j) => {
            return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]), 0);
        });
    });
}

function toXyz(lab) {
    var fY = (lab.L + 16.0) / 116.0;
    var fX = (lab.a / 500.0) + fY;
    var fZ = fY - (lab.b / 200.0);

    var xR = (Math.pow(fX, 3) > 0.008856) ? Math.pow(fX, 3) : ((116 * fX - 16) / 903.3);
    var yR = (lab.L > 903.3 * .008856) ? Math.pow((lab.L + 16) / 116.0, 3) : lab.L / 903.3;
    var zR = (Math.pow(fZ, 3) > 0.008856) ? Math.pow(fZ, 3) : ((116 * fZ - 16) / 903.3);

    var d50x = 0.9642;
    var d50y = 1.0;
    var d50z = 0.8251;

    var xyz = {X: xR * d50x, Y: yR * d50y, Z: zR * d50z};
    return xyz
}

function toRgb(xyz) {
    var invM = [[3.2404542, -1.5371385, -0.4985314], 
                [-0.9692660, 1.8760108, 0.0415560], 
                [0.0556434, -0.2040259, 1.0572252]];
    var xyzM = [[xyz.X], [xyz.Y], [xyz.Z]];
    var rgbM = matrixDot(invM, xyzM);
    var rgb = {R: rgbM[0][0], G: rgbM[1][0], B: rgbM[2][0]};
    return rgb;
}

function convert(lab) {
    var xyz = toXyz(lab);
    console.info(xyz);
    var rgb = toRgb(xyz);
    console.info(rgb);
}

convert({L: 35, a: 28, b: 13});