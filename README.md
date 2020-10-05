# Reel Test
## How to run
1. To use the symbol graphics that were provided (Not uploaded to this repo due to copyright)
   Place them inside the `assets` folder in the checked out repository.
   
2. Then run `npm install` and then `npm run dev` to run the reel demo
   locally. The assets are copied over to the correct path up on running the 
   local version.  
   I did not include a production build, as it seemed a bit overkill. But it wouldn't be hard  
   to add that to the webpack config:
   1. Add environment variable to be used to determine which build should occur
   2. Add the Terser Plugin for minification and obfuscation (if wanted).
   3. Do whatever you want with the minified bundle :)
   
   But if it was a production workflow, I would probably use the tool `semantic-release` as it
   allows for automated versioning, and repository tagging including changelogs and references to
   specific commits that had changes done. Which makes for easy tracking, combine this with a
   link to Jira or other tools, and you have the best tracing and tracking of issues possible.

## Configurable options
You can modify the spin duration by either setting the amount of symbols that are being
ran through. Or by settings the spin duration in flat seconds.

## Issues that are still there
   1. The easing is not perfect, as I just stole a function from easing.net.  
       It get's a bit upset when used with a lot of symbols in the padding, the
       swing on and swing off is currently based on the total distance between
       start and end. Rather then a fixed amplitude.
       So above 75 symbols the swing off and swing on are a bit violent.
   
