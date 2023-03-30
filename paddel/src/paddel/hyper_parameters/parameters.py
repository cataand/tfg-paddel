from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

model_parameter_rules = {
    SVC: [
        (
            {},
            {
                "C": [0.5, 0.6, 0.7, 0.9, 1],
                "kernel": ["linear"],
                "tol": [1e-6],
                "class_weight": [{0: w, 1: 1} for w in [1, 1.5, 2]],
            },
        ),
        ({"kernel": {"poly"}}, {"degree": [2, 4, 5, 6, 7]}),
        ({"kernel": {"rbf", "poly", "sigmoid"}}, {"gamma": ["scale", "auto"]}),
        ({"kernel": {"poly", "sigmoid"}}, {"coef0": [0, 1, -1, 2]}),
    ],
    GaussianNB: [({}, {})],
    KNeighborsClassifier: [
        (
            {},
            {
                "n_neighbors": [3, 5, 7, 9, 11],
                "weights": ["uniform", "distance"],
                "metric": [
                    "cityblock",
                    "cosine",
                    "l1",
                    "l2",
                    "nan_euclidean",
                ],
            },
        ),
        ({"metric": ["minkowski"]}, {"p": [1, 2, 3, 4]}),
    ],
    RandomForestClassifier: [
        (
            {},
            {
                "n_estimators": [50, 100, 200, 400, 800, 1600],
                "criterion": ["gini", "entropy", "log_loss"],
                "max_features": ["sqrt", "log2", None],
                "class_weight": [{0: w, 1: 1} for w in [1, 1.5, 2]],
            },
        )
    ],
    DecisionTreeClassifier: [
        (
            {},
            {
                "criterion": ["gini", "entropy", "log_loss"],
                "splitter": ["best", "random"],
                "max_features": ["sqrt", "log2", None],
                "class_weight": [{0: w, 1: 1} for w in [1, 1.5, 2]],
            },
        )
    ],
    MLPClassifier: [
        (
            {},
            {
                "max_iter": [2000],
                "hidden_layer_sizes": [(10, 10), (50,), (100,), (100, 50)],
                "activation": ["identity", "logistic", "tanh", "relu"],
                "solver": ["lbfgs", "sgd", "adam"],
                "alpha": [0.0001, 0.01, 1],
            },
        )
    ],
    AdaBoostClassifier: [
        (
            {},
            {
                "n_estimators": [25, 50, 100, 200, 400, 800],
                "learning_rate": [0.1, 1, 10],
            },
        )
    ],
    XGBClassifier: [
        (
            {},
            {
                "n_estimators": [25, 50, 100, 200, 400, 800],
                "grow_policy": ["depthwise", "lossguide"],
                "learning_rate": [0.01, 0.1, 1],
            },
        )
    ]
}
