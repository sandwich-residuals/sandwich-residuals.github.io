window.SR_DATA = {
 "arms": [
  "frozen",
  "predlast",
  "predfirst",
  "sandwich_encvis"
 ],
 "aggregate": [
  {
   "label": "Medium Maze",
   "values": [
    67.7,
    69.4,
    71.6,
    71.8
   ],
   "n_cond": 5
  },
  {
   "label": "Diverse Maze",
   "values": [
    45.6,
    53.6,
    62.8,
    63.2
   ],
   "n_cond": 1
  },
  {
   "label": "PushObj",
   "values": [
    38.4,
    64.2,
    66.2,
    62.3
   ],
   "n_cond": 7
  },
  {
   "label": "PushT",
   "values": [
    47.5,
    60.0,
    68.6,
    63.4
   ],
   "n_cond": 8
  },
  {
   "label": "Compound",
   "values": [
    34.5,
    57.8,
    65.2,
    66.0
   ],
   "n_cond": 7
  },
  {
   "label": "OGBench-Cube",
   "values": [
    58.7,
    57.8,
    58.0,
    60.0
   ],
   "n_cond": 4
  }
 ],
 "overall": [
  49.2,
  63.4,
  68.2,
  65.0
 ],
 "primary": [
  {
   "cond": "mediummaze__default",
   "label": "No shift",
   "env": "Medium Maze",
   "cells": [
    {
     "m": 80.8,
     "sd": 8.9,
     "n": 5
    },
    {
     "m": 86.0,
     "sd": 5.8,
     "n": 5
    },
    {
     "m": 84.0,
     "sd": 5.7,
     "n": 5
    },
    {
     "m": 81.2,
     "sd": 6.7,
     "n": 5
    }
   ]
  },
  {
   "cond": "mediummaze__damping_50",
   "label": "Damping 50\u00d7",
   "env": "Medium Maze",
   "cells": [
    {
     "m": 46.4,
     "sd": 3.8,
     "n": 5
    },
    {
     "m": 52.0,
     "sd": 4.0,
     "n": 5
    },
    {
     "m": 59.2,
     "sd": 3.0,
     "n": 5
    },
    {
     "m": 66.0,
     "sd": 3.7,
     "n": 5
    }
   ]
  },
  {
   "cond": "mediummaze__density_0.2",
   "label": "Density 0.2\u00d7",
   "env": "Medium Maze",
   "cells": [
    {
     "m": 90.0,
     "sd": 4.5,
     "n": 5
    },
    {
     "m": 86.4,
     "sd": 6.2,
     "n": 5
    },
    {
     "m": 88.0,
     "sd": 7.7,
     "n": 5
    },
    {
     "m": 88.4,
     "sd": 5.7,
     "n": 5
    }
   ]
  },
  {
   "cond": "mediummaze__density_10",
   "label": "Density 10\u00d7",
   "env": "Medium Maze",
   "cells": [
    {
     "m": 38.0,
     "sd": 5.1,
     "n": 5
    },
    {
     "m": 39.6,
     "sd": 6.1,
     "n": 5
    },
    {
     "m": 42.8,
     "sd": 4.6,
     "n": 5
    },
    {
     "m": 40.4,
     "sd": 3.0,
     "n": 5
    }
   ]
  },
  {
   "cond": "mediummaze__blur_2",
   "label": "Blur \u03c3=2",
   "env": "Medium Maze",
   "cells": [
    {
     "m": 83.2,
     "sd": 6.6,
     "n": 5
    },
    {
     "m": 83.2,
     "sd": 6.4,
     "n": 5
    },
    {
     "m": 84.0,
     "sd": 4.7,
     "n": 5
    },
    {
     "m": 83.2,
     "sd": 7.7,
     "n": 5
    }
   ]
  },
  {
   "cond": "diversemaze__unseen_3_5",
   "label": "Unseen layouts, shortest-path distance 3\u20135",
   "env": "Diverse Maze",
   "cells": [
    {
     "m": 45.6,
     "sd": 9.1,
     "n": 5
    },
    {
     "m": 53.6,
     "sd": 6.1,
     "n": 5
    },
    {
     "m": 62.8,
     "sd": 8.2,
     "n": 5
    },
    {
     "m": 63.2,
     "sd": 11.0,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__T",
   "label": "T",
   "env": "PushObj",
   "cells": [
    {
     "m": 50.4,
     "sd": 4.3,
     "n": 5
    },
    {
     "m": 76.4,
     "sd": 3.0,
     "n": 5
    },
    {
     "m": 79.6,
     "sd": 5.2,
     "n": 5
    },
    {
     "m": 76.4,
     "sd": 6.5,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__L",
   "label": "L",
   "env": "PushObj",
   "cells": [
    {
     "m": 47.6,
     "sd": 6.2,
     "n": 5
    },
    {
     "m": 76.8,
     "sd": 3.0,
     "n": 5
    },
    {
     "m": 77.2,
     "sd": 2.3,
     "n": 5
    },
    {
     "m": 71.6,
     "sd": 7.3,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__Z",
   "label": "Z",
   "env": "PushObj",
   "cells": [
    {
     "m": 37.6,
     "sd": 8.9,
     "n": 5
    },
    {
     "m": 72.8,
     "sd": 4.6,
     "n": 5
    },
    {
     "m": 79.2,
     "sd": 6.7,
     "n": 5
    },
    {
     "m": 70.4,
     "sd": 4.8,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__plus",
   "label": "Plus",
   "env": "PushObj",
   "cells": [
    {
     "m": 36.4,
     "sd": 5.5,
     "n": 5
    },
    {
     "m": 72.0,
     "sd": 5.8,
     "n": 5
    },
    {
     "m": 76.8,
     "sd": 6.4,
     "n": 5
    },
    {
     "m": 70.4,
     "sd": 8.2,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__I",
   "label": "I*",
   "env": "PushObj",
   "cells": [
    {
     "m": 24.8,
     "sd": 7.0,
     "n": 5
    },
    {
     "m": 46.0,
     "sd": 9.4,
     "n": 5
    },
    {
     "m": 43.2,
     "sd": 7.6,
     "n": 5
    },
    {
     "m": 45.6,
     "sd": 8.9,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__small_tee",
   "label": "Small T*",
   "env": "PushObj",
   "cells": [
    {
     "m": 49.6,
     "sd": 4.6,
     "n": 5
    },
    {
     "m": 65.6,
     "sd": 9.0,
     "n": 5
    },
    {
     "m": 63.2,
     "sd": 8.8,
     "n": 5
    },
    {
     "m": 62.4,
     "sd": 11.8,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__square",
   "label": "Square*",
   "env": "PushObj",
   "cells": [
    {
     "m": 22.4,
     "sd": 7.1,
     "n": 5
    },
    {
     "m": 40.0,
     "sd": 5.1,
     "n": 5
    },
    {
     "m": 44.4,
     "sd": 7.0,
     "n": 5
    },
    {
     "m": 39.2,
     "sd": 9.5,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__default",
   "label": "No shift",
   "env": "PushT",
   "cells": [
    {
     "m": 62.0,
     "sd": 6.0,
     "n": 5
    },
    {
     "m": 75.6,
     "sd": 3.6,
     "n": 5
    },
    {
     "m": 82.4,
     "sd": 2.6,
     "n": 5
    },
    {
     "m": 77.6,
     "sd": 5.5,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__blur_2",
   "label": "Blur \u03c3=2",
   "env": "PushT",
   "cells": [
    {
     "m": 50.4,
     "sd": 4.3,
     "n": 5
    },
    {
     "m": 69.2,
     "sd": 5.8,
     "n": 5
    },
    {
     "m": 82.8,
     "sd": 5.6,
     "n": 5
    },
    {
     "m": 72.8,
     "sd": 4.1,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__snp_0.01",
   "label": "S&P noise 0.01",
   "env": "PushT",
   "cells": [
    {
     "m": 55.6,
     "sd": 4.1,
     "n": 5
    },
    {
     "m": 70.4,
     "sd": 8.8,
     "n": 5
    },
    {
     "m": 83.2,
     "sd": 2.3,
     "n": 5
    },
    {
     "m": 72.0,
     "sd": 4.2,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__dark_0.9",
   "label": "Brightness 0.9\u00d7",
   "env": "PushT",
   "cells": [
    {
     "m": 65.6,
     "sd": 7.1,
     "n": 5
    },
    {
     "m": 74.8,
     "sd": 6.3,
     "n": 5
    },
    {
     "m": 82.0,
     "sd": 4.2,
     "n": 5
    },
    {
     "m": 73.6,
     "sd": 6.5,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__red_agent",
   "label": "Red agent",
   "env": "PushT",
   "cells": [
    {
     "m": 50.0,
     "sd": 4.7,
     "n": 5
    },
    {
     "m": 62.4,
     "sd": 6.1,
     "n": 5
    },
    {
     "m": 74.0,
     "sd": 4.9,
     "n": 5
    },
    {
     "m": 67.2,
     "sd": 3.3,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__red_block",
   "label": "Red block",
   "env": "PushT",
   "cells": [
    {
     "m": 14.0,
     "sd": 4.2,
     "n": 5
    },
    {
     "m": 11.2,
     "sd": 4.1,
     "n": 5
    },
    {
     "m": 10.0,
     "sd": 2.0,
     "n": 5
    },
    {
     "m": 12.8,
     "sd": 1.8,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__red_anchor",
   "label": "Red anchor",
   "env": "PushT",
   "cells": [
    {
     "m": 29.6,
     "sd": 3.8,
     "n": 5
    },
    {
     "m": 36.0,
     "sd": 5.7,
     "n": 5
    },
    {
     "m": 43.2,
     "sd": 8.2,
     "n": 5
    },
    {
     "m": 42.4,
     "sd": 3.3,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__kv_2",
   "label": "Controller kv 2\u00d7",
   "env": "PushT",
   "cells": [
    {
     "m": 53.2,
     "sd": 5.4,
     "n": 5
    },
    {
     "m": 80.8,
     "sd": 5.2,
     "n": 5
    },
    {
     "m": 91.2,
     "sd": 3.0,
     "n": 5
    },
    {
     "m": 88.4,
     "sd": 5.4,
     "n": 5
    }
   ]
  }
 ],
 "compound": [
  {
   "cond": "mediummaze__blur_2_damping_50",
   "label": "Medium Maze: blur \u03c3=2 + damping 50\u00d7",
   "short": "Medium Maze: blur + damping 50\u00d7",
   "cells": [
    {
     "m": 46.8,
     "sd": 7.8,
     "n": 5
    },
    {
     "m": 54.0,
     "sd": 4.7,
     "n": 5
    },
    {
     "m": 56.0,
     "sd": 4.0,
     "n": 5
    },
    {
     "m": 65.6,
     "sd": 6.2,
     "n": 5
    }
   ]
  },
  {
   "cond": "mediummaze__blur_2_density_10",
   "label": "Medium Maze: blur \u03c3=2 + density 10\u00d7",
   "short": "Medium Maze: blur + density 10\u00d7",
   "cells": [
    {
     "m": 38.8,
     "sd": 6.1,
     "n": 5
    },
    {
     "m": 39.2,
     "sd": 3.6,
     "n": 5
    },
    {
     "m": 37.2,
     "sd": 7.2,
     "n": 5
    },
    {
     "m": 40.8,
     "sd": 3.0,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__blur_2_kv_2",
   "label": "PushT: blur \u03c3=2 + controller kv 2\u00d7",
   "short": "PushT: blur + kv 2\u00d7",
   "cells": [
    {
     "m": 40.4,
     "sd": 4.3,
     "n": 5
    },
    {
     "m": 76.8,
     "sd": 3.3,
     "n": 5
    },
    {
     "m": 87.6,
     "sd": 2.6,
     "n": 5
    },
    {
     "m": 87.6,
     "sd": 3.0,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__red_anchor_kv_2",
   "label": "PushT: red anchor + controller kv 2\u00d7",
   "short": "PushT: red anchor + kv 2\u00d7",
   "cells": [
    {
     "m": 30.4,
     "sd": 4.3,
     "n": 5
    },
    {
     "m": 42.4,
     "sd": 7.4,
     "n": 5
    },
    {
     "m": 53.2,
     "sd": 4.1,
     "n": 5
    },
    {
     "m": 51.2,
     "sd": 7.7,
     "n": 5
    }
   ]
  },
  {
   "cond": "pusht__blur_2_red_anchor_kv_2",
   "label": "PushT: blur \u03c3=2 + red anchor + controller kv 2\u00d7",
   "short": "PushT: blur + red anchor + kv 2\u00d7",
   "cells": [
    {
     "m": 34.4,
     "sd": 8.6,
     "n": 5
    },
    {
     "m": 41.2,
     "sd": 5.8,
     "n": 5
    },
    {
     "m": 68.8,
     "sd": 6.7,
     "n": 5
    },
    {
     "m": 59.6,
     "sd": 2.6,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__T_blur_2_kv_2",
   "label": "PushObj T: blur \u03c3=2 + controller kv 2\u00d7",
   "short": "PushObj T: blur + kv 2\u00d7",
   "cells": [
    {
     "m": 26.8,
     "sd": 3.0,
     "n": 5
    },
    {
     "m": 84.8,
     "sd": 2.7,
     "n": 5
    },
    {
     "m": 85.6,
     "sd": 3.3,
     "n": 5
    },
    {
     "m": 87.2,
     "sd": 5.0,
     "n": 5
    }
   ]
  },
  {
   "cond": "pushshape__square_blur_2_kv_2",
   "label": "PushObj Square: blur \u03c3=2 + controller kv 2\u00d7",
   "short": "PushObj Square: blur + kv 2\u00d7",
   "cells": [
    {
     "m": 23.6,
     "sd": 6.4,
     "n": 5
    },
    {
     "m": 66.4,
     "sd": 8.6,
     "n": 5
    },
    {
     "m": 68.0,
     "sd": 9.1,
     "n": 5
    },
    {
     "m": 70.0,
     "sd": 9.1,
     "n": 5
    }
   ]
  }
 ],
 "cube": [
  {
   "cond": "cubedino__default",
   "label": "No shift",
   "cells": [
    {
     "m": 62.7,
     "sd": 3.1,
     "n": 3
    },
    {
     "m": 60.7,
     "sd": 3.1,
     "n": 3
    },
    {
     "m": 64.0,
     "sd": 2.0,
     "n": 3
    },
    {
     "m": 60.7,
     "sd": 5.0,
     "n": 3
    }
   ]
  },
  {
   "cond": "cubedino__light_0.3",
   "label": "Light intensity 0.3",
   "cells": [
    {
     "m": 58.7,
     "sd": 4.2,
     "n": 3
    },
    {
     "m": 60.0,
     "sd": 4.0,
     "n": 3
    },
    {
     "m": 58.7,
     "sd": 4.6,
     "n": 3
    },
    {
     "m": 61.3,
     "sd": 5.0,
     "n": 3
    }
   ]
  },
  {
   "cond": "cubedino__camera_10",
   "label": "Camera yaw/pitch +10\u00b0",
   "cells": [
    {
     "m": 54.0,
     "sd": 5.3,
     "n": 3
    },
    {
     "m": 51.3,
     "sd": 5.0,
     "n": 3
    },
    {
     "m": 52.0,
     "sd": 5.3,
     "n": 3
    },
    {
     "m": 56.0,
     "sd": 2.0,
     "n": 3
    }
   ]
  },
  {
   "cond": "cubedino__gain_0.5",
   "label": "Arm gain 0.5\u00d7",
   "cells": [
    {
     "m": 59.3,
     "sd": 5.8,
     "n": 3
    },
    {
     "m": 59.3,
     "sd": 5.8,
     "n": 3
    },
    {
     "m": 57.3,
     "sd": 3.1,
     "n": 3
    },
    {
     "m": 62.0,
     "sd": 2.0,
     "n": 3
    }
   ]
  }
 ],
 "cube_avg": [
  58.7,
  57.8,
  58.0,
  60.0
 ],
 "paired": [
  {
   "label": "All 21 conditions",
   "diffs": [
    {
     "m": 15.8,
     "se": 1.2,
     "n": 105
    },
    {
     "m": 1.6,
     "se": 0.7,
     "n": 105
    },
    {
     "m": -3.2,
     "se": 0.8,
     "n": 105
    }
   ]
  },
  {
   "label": "Medium Maze",
   "diffs": [
    {
     "m": 4.2,
     "se": 1.9,
     "n": 25
    },
    {
     "m": 2.4,
     "se": 1.6,
     "n": 25
    },
    {
     "m": 0.2,
     "se": 1.0,
     "n": 25
    }
   ]
  },
  {
   "label": "Diverse Maze",
   "diffs": [
    {
     "m": 17.6,
     "se": 1.2,
     "n": 5
    },
    {
     "m": 9.6,
     "se": 2.5,
     "n": 5
    },
    {
     "m": 0.4,
     "se": 4.3,
     "n": 5
    }
   ]
  },
  {
   "label": "PushObj",
   "diffs": [
    {
     "m": 23.9,
     "se": 1.7,
     "n": 35
    },
    {
     "m": -1.9,
     "se": 0.9,
     "n": 35
    },
    {
     "m": -3.9,
     "se": 1.5,
     "n": 35
    }
   ]
  },
  {
   "label": "PushT",
   "diffs": [
    {
     "m": 15.8,
     "se": 1.8,
     "n": 40
    },
    {
     "m": 3.3,
     "se": 0.9,
     "n": 40
    },
    {
     "m": -5.2,
     "se": 1.2,
     "n": 40
    }
   ]
  },
  {
   "label": "Compound (7)",
   "diffs": [
    {
     "m": 31.5,
     "se": 3.4,
     "n": 35
    },
    {
     "m": 8.2,
     "se": 1.3,
     "n": 35
    },
    {
     "m": 0.8,
     "se": 1.4,
     "n": 35
    }
   ]
  },
  {
   "label": "OGBench-Cube",
   "diffs": [
    {
     "m": 1.3,
     "se": 1.5,
     "n": 12
    },
    {
     "m": 2.2,
     "se": 1.2,
     "n": 12
    },
    {
     "m": 2.0,
     "se": 1.8,
     "n": 12
    }
   ]
  }
 ],
 "ablation": [
  {
   "env": "Medium Maze: blur + damping 50x",
   "cond": "mediummaze__blur_2_damping_50",
   "bars": [
    {
     "label": "frozen",
     "value": 46.8
    },
    {
     "label": "full",
     "value": 65.6
    },
    {
     "label": "noaction",
     "value": 63.6
    },
    {
     "label": "nooutput",
     "value": 56.4
    },
    {
     "label": "noinput",
     "value": 64.4
    }
   ]
  },
  {
   "env": "PushT: blur + controller kv 2x",
   "cond": "pusht__blur_2_kv_2",
   "bars": [
    {
     "label": "frozen",
     "value": 40.4
    },
    {
     "label": "full",
     "value": 87.6
    },
    {
     "label": "noaction",
     "value": 77.6
    },
    {
     "label": "nooutput",
     "value": 72.0
    },
    {
     "label": "noinput",
     "value": 71.2
    }
   ]
  }
 ]
};
