import gulp from "gulp";
import fileInclude from "gulp-file-include";
import htmlMin from "gulp-htmlmin";
import versionNumber from "gulp-version-number";
import webpHtml from "gulp-webp-html-nosvg";

import { logger } from "../config/logger.js";
import { filePaths } from "../config/paths.js";
import { plugins } from "../config/plugins.js";

const html = (isBuild, serverInstance) => {
	return gulp
		.src(filePaths.src.html)
		.pipe(logger.handleError("HTML"))
		.pipe(fileInclude())
		.pipe(plugins.replace(/@img\//g, "images/"))
		.pipe(plugins.replace(/@vid\//g, "static/videos/"))
		.pipe(plugins.if(isBuild, webpHtml()))
		.pipe(
			htmlMin({
				useShortDoctype: true,
				sortClassName: true,
				removeComments: isBuild,

				/** Раскомментировать если требуется минификация html */
				//collapseWhitespace: isBuild,
			})
		)
		.pipe(
			plugins.if(
				isBuild,
				versionNumber({
					value: "%DT%",

					append: {
						key: "_v",
						cover: 0,
						to: ["css", "js"],
					},

					output: {
						file: "gulp/version.json",
					},
				})
			)
		)
		.pipe(gulp.dest(filePaths.buildFolder))
		.pipe(serverInstance.stream());
};

export { html };
