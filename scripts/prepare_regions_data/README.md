This script pre-processes the regions data from the source files into a shape
that is more ergonomic for loading.  This lets us avoid expensive preprocessing
on every load and also gives us a hook for re-shaping the data later to further
improve performance.
