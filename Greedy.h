#pragma once
#include "Framework.h"

class Greedy : public Framework {
public:
  Greedy(Network *g);
  ~Greedy();
  double get_solution(bool is_ds = true);
  int get_no_queries();

private:
  int no_queries;
};
