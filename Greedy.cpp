#include "Greedy.h"
#include <iostream>

Greedy::Greedy(Network *g) : Framework(g), no_queries(0) {}

Greedy::~Greedy() {}

double Greedy::get_solution(bool is_ds) {
  kseeds seeds;
  int no_nodes = g->get_no_nodes();
  double burned_budgets = 0.0, max_inf = 0;
  vector<bool> selected(no_nodes, false);

  while (true) {
    int e_max = -1, i_max = -1;
    double max_delta = 0;

    for (int e = 0; e < no_nodes; ++e) {
      if (selected[e]) {
        continue;
      }
      int exceed_times = 0;
      for (int i = 0; i < Constants::K; ++i) {
        if (burned_budgets + cost_matrix[e][i] <= Constants::BUDGET) {
          kseeds tmp_seeds = seeds;
          tmp_seeds.push_back(kpoint(e, i));
          double current_max_delta =
              (estimate_influence(tmp_seeds) - max_inf) / cost_matrix[e][i];
          no_queries++;
          if (current_max_delta > max_delta) {
            e_max = e;
            i_max = i;
            max_delta = current_max_delta;
          }
        } else {
          exceed_times++;
        }
      }
      if (exceed_times == Constants::K) {
        selected[e] = true;
      };
    }

    if (e_max > -1 && i_max > -1) {
      selected[e_max] = true;
      seeds.push_back(pair<uint, uint>(e_max, i_max));
      burned_budgets += cost_matrix[e_max][i_max];
      max_inf = estimate_influence(seeds);
    }

    // Check if all the edge are selected
    int selected_count = 0;
    for (bool x : selected) {
      if (x) {
        selected_count++;
      }
    }
    if (selected_count == no_nodes) {
      break;
    }
  }

  return max_inf;
}

int Greedy::get_no_queries() { return no_queries; }